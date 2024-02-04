const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const session = require('express-session');
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

const app = express();
const port = 3001;
const saltRounds = 10;

const SYSTEM = "SYSTEM:";
const jwtSecret = "tajny_klucz";

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type,Authorization',
    // exposedHeaders: 'Content-Length',
    // maxAge: 600, // 10 minut
    // optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use(session({
//   secret: 'mySecretKey', // Klucz używany do podpisywania ciasteczka sesji
//   resave: false,
//   saveUninitialized: true,
//   name: 'fid',
//   cookie: {
//     maxAge: 3600000, // Czas ważności ciasteczka sesji w milisekundach (np. 1 godzina)
//     //secure: true, // Ustaw na true, jeśli korzystasz z protokołu HTTPS
//     httpOnly: true, // Uniemożliwia dostęp do ciasteczka sesji z poziomu przeglądarki (JavaScript)
//     // rolling: true,
//   },
// }));

app.use(express.static(path.join(__dirname, "..", "build"), { cache: false }));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use((req, res, next) => {
  console.error(`req.headers: ${JSON.stringify(req.headers)}`);
  const currentTime = new Date();
  console.error(`currentTime: ${currentTime}`);

  next();
});

const checkAuthorizationHeader = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(400).json({ success: false, message: "Brak nagłówka Authorization." });
    return;
  }

  next();
};

console.log("=============== SERVER - LOGOWANIRE ================");

// app.get('/', (req, res) => {
//   if (req.session.views) {
//     req.session.views++;
//     res.send(`Views: ${req.session.views}`);
//   } else {
//     req.session.views = 1;
//     res.send('Welcome to the session demo. Refresh the page!');
//   }
// });

const checkLoggedIn = (req, res, next) => {
  if (req.session.user && req.session.user.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: `${SYSTEM} Brak autoryzacji.` });
  }
};

app.post("/logowanie", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    res.status(400).json({ message: `${SYSTEM} Uzupełnij Dane` });
    return;
  }

  const query = "SELECT * FROM users WHERE user = ?";

  db.query(query, [username], async (error, results) => {
    if (error) {
      res.status(500).json({ message: `${SYSTEM} Błąd podczas logowania.` });
      return;
    } else if (results.length === 1) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.pass);
      if (match) {
        const tokenData = {
          ids: user.ids,
          role: user.role,
          user: user.user,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Czas wygaśnięcia ustawiony na 1 godzinę od teraz
        };

        const token = jwt.sign(tokenData, jwtSecret);

        const updateQuery = "UPDATE users SET token = ?, dataLogowania = NOW(), iloscLogowan = iloscLogowan + 1 WHERE ids = ?";

        db.query(updateQuery, [token, user.ids], (updateError, updateResults) => {
            if (updateError) {
              res.status(500).json({
                message: `${SYSTEM} Błąd podczas zapisywania tokena.`,
              });
            } else {
              const responseObject = {
                success: true,
                message: `${SYSTEM} Pomyślnie zalogowano.`,
                token,
                username: user.user,
              };

              // req.session.user = { loggedIn: true };

              res.cookie("token", token, {
                httpOnly: true,
                // sameSite: "None",
                // sameSite: "Lax",
                // Wymagane, jeśli SameSite ustawione na "None" i nie jesteś na HTTPS
                // secure: true,
                // secure: false,
                maxAge: 15 * 60 * 1000, // czas życia ciasteczka w milisekundach (tu: 15 minut)
                path: "/"
              });

              res.status(200).json(responseObject);

              // console.log('-----------------RESPONSE START-----------------');
              // console.log("/User.id: "+user.ids);
              // console.log("/Token: "+token);
              // const decodedToken = jwt.verify(token, 'tajny_klucz');
              // console.log("/decodedToken: "+ decodedToken);
              // console.log("/Query: "+ updateQuery);
              // console.log("/responseObject: "+responseObject); // Wyświetlenie danych zwróconych z serwera
              // console.log("/responseObject + JSON.stringify: " + JSON.stringify(responseObject, null, 2));
              // console.log('-----------------RESPONSE END-----------------');
            }
          }
        );
      } else {
        res.json({ message: `${SYSTEM} Niepoprawne dane logowania.` });
      }
    } else {
      res.json({ message: `${SYSTEM} Niepoprawne dane logowania.` });
    }
  });
});










app.post("/logout", checkAuthorizationHeader, (req, res) => {

  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    console.log(`decoded: ${JSON.stringify(decoded)}`);

    // Pobierz nazwę użytkownika bezpośrednio z zdekodowanego tokena
    const username = decoded.user;
    console.log(`decoded.ids: ${JSON.stringify(decoded.ids)}`);

    // Sprawdź, czy token jest prawidłowy
    const checkTokenQuery = "SELECT ids FROM users WHERE ids = ?";
    db.query(checkTokenQuery, [decoded.ids], (error, results) => {
      if (error || results.length === 0) {
        console.log(`results.length: ${results.length}`);
        res.status(500).json({ success: false, message: "Niepoprawny token." });
        return;
      }

      // Usuń token z bazy danych
      const updateQuery = "UPDATE users SET token = NULL WHERE ids = ?";
      db.query(updateQuery, [decoded.id], (updateError, updateResults) => {
        if (updateError) {
          res.status(500).json({
            success: false,
            message: `Błąd podczas usuwania tokena: ${updateError}`,
          });
          return;
        }

        res.cookie("token", "", {
          httpOnly: true,
          // sameSite: "None",
          // sameSite: "Lax",
          // sameSite: "Strict",
          // secure: true, // Wymagane, jeśli SameSite ustawione na "None" i nie jesteś na HTTPS
          // secure: false,
          maxAge: 0, // czas życia ciasteczka w milisekundach (tu: 15 minut)
          path: "/"
        });

        // req.session.destroy();
        // res.clearCookie('fid');


        res
          .status(200)
          .json({ success: true, message: "Pomyślnie wylogowano." });
      });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Błąd serwera.", error: err });
  }
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
