const jwt = require("jsonwebtoken");
const jwtSecret = "tajny_klucz";
const db = require("./db");
const SYSTEM = "SYSTEM :";

// const generateNewToken = ({ userDataToToken }) => {
//   const { id, user, role } = userDataToToken;
//   console.log(userDataToToken);
//   const newToken = jwt.sign({ id, user, role }, jwtSecret, { expiresIn: '1h' });
//   console.log(`newToken: ${newToken}`);
//   return newToken;
// };

const generateNewToken = ({ id, user, role }) => {
  const expiresIn = "1h";
  // const newToken = jwt.sign({ id, user, role }, jwtSecret, { expiresIn });
  const newToken = jwt.sign({ id, user, role, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, jwtSecret);
  // console.log(`generateNewToken: ${newToken}`);
  return newToken;
};

const updateTokenInDatabase = async (userId, newToken) => {
  return new Promise((resolve, reject) => {
    const updateTokenQuery = "UPDATE users SET token = ? WHERE ids = ?";
    db.query(
      updateTokenQuery,
      [newToken, userId],
      (queryError, queryResults) => {
        if (queryError) {
          reject({
            success: false,
            message: `${SYSTEM} Błąd podczas aktualizacji tokenu w bazie danych.`,
          });
        } else if (queryResults.affectedRows === 1) {
          resolve({ success: true });
        } else {
          reject({
            success: false,
            message: `${SYSTEM} Aktualizacja tokenu nie powiodła się. Użytkownik o podanym ID nie istnieje.`,
          });
        }
      }
    );
  });
};

const verifyToken = async (req, res, next) => {
  console.log("=== / ----------------- verifyToken START--------------------");
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const currentTime = new Date();
  console.log(`=== / verifyToken currentTime: ( ${currentTime} )`);

  if (!token) {
    console.log(`=== /TOKEN NIE ISTNIEJE - if (!token)`);
    console.log("=== / ----------------- verifyToken STOP--------------------");
    return next();
    
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Strefa czasowa użytkownika:", userTimeZone);

    const serverTime = new Date();
    console.log("Czas serwera:", serverTime);

    const userTime = new Date(
      serverTime.toLocaleString("en-US", { timeZone: userTimeZone })
    );
    console.log("Czas lokalny użytkownika:", userTime);

    req.decodedToken = decodedToken;
    req.decodedTokenId = decodedToken.id;
    console.log(decodedToken);
    const expiresInMinutes = Math.floor(
      (decodedToken.exp - Date.now() / 1000) / 60
    );

    console.log(expiresInMinutes + " min");

    if (expiresInMinutes < 5) {
      console.log(`${expiresInMinutes} < 5`);
      try {
        const result = await checkUserInDatabase(decodedToken.id);
        const newToken = generateNewToken(
          decodedToken.id,
          decodedToken.user,
          decodedToken.role
        );
        await updateTokenInDatabase(decodedToken.ids, newToken);
        console.log(result);
        console.log(`newToken S: ${newToken}`);
        console.log("=== / ----------------- verifyToken STOP--------------------");
        next();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(`expiresInMinutes ${expiresInMinutes} > 5`);
 
      
      req.userId = decodedToken.ids;
      const ID = decodedToken.ids;
      console.log(`//ID = ${ID}`);

      try {
        const result = await checkUserInDatabase(ID);

        console.log(`verifyToken - checkUserInDatabase - Result => ${result} `);
        console.log(`verifyToken - checkUserInDatabase - Result = JSON => ${JSON.stringify(result, null, 2)}`);
        next();


      } catch (error) {
        console.error(error);
      }
      req.userId = decodedToken.ids;

    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Odmowa dostępu. Token wygasł." });
    } else {
      return res.status(401).json({
        message: "Odmowa dostępu. Nieprawidłowy token.",
        error: error.message,
      });
    }
  }
};

const checkUserInDatabase = async (userId, res) => {
  return new Promise((resolve, reject) => {
    console.log(`:::::::::: checkUserInDatabase ID: ${userId}`);
    const getUserQuery = "SELECT ids, user, role FROM users WHERE ids = ?";
    db.query(getUserQuery, [userId], (queryError, queryResults) => {
      if (queryError) {
        reject({
          success: false,
          message: `${SYSTEM} Błąd podczas pobierania danych użytkownika z bazy.`,
        });
      } else if (queryResults.length === 1) {
        resolve({ 
          success: true,
          userId: userId,
        });
      } else {
        reject({
          success: false,
          message: `${SYSTEM} Użytkownik o podanym ID nie istnieje.`,
        });
      }
    });
  });
};

module.exports = verifyToken;
