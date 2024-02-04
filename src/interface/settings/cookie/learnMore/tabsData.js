const tabsData = [
  {
    id: 1,
    title: "essential",
    icon: "edit",
    checked: true,
    disabled: true,
    content: (
      <div>
        <h1>Niezbędne pliki cookie</h1>

        <div className="my2">
          Niezbędne pliki cookie są kluczowe dla prawidłowego funkcjonowania
          strony internetowej. Te pliki są odpowiedzialne za zapamiętywanie
          preferencji użytkownika dotyczących plików cookie na naszej stronie.
          Bez tych plików nie bylibyśmy w stanie zapewnić odpowiednich usług.
        </div>

        <div className="my2">
          Te pliki cookie gromadzą informacje o tym, jak użytkownicy korzystają
          z naszej witryny, co nam pomaga ulepszać jej funkcje i dostosowywać
          treści do potrzeb odwiedzających. Bez tych plików cookie nie
          mielibyśmy pełnej kontroli nad analizą ruchu na stronie.
        </div>
        <div className="my2">
          Ważne jest zauważenie, że niektóre funkcje strony nie będą działać
          poprawnie, jeśli użytkownik zdecyduje się wyłączyć niezbędne pliki
          cookie. Dlatego zalecamy akceptację tych plików, aby zapewnić pełne i
          satysfakcjonujące doświadczenie korzystania z naszej witryny.
        </div>
        <div className="my2">
          Pamiętaj, że możesz dostosować ustawienia plików cookie w każdej
          chwili, korzystając z opcji przeglądarki internetowej. Jednakże,
          wyłączenie niezbędnych plików cookie może wpłynąć na działanie
          niektórych funkcji strony.
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "statistics",
    icon: "select_check_box",
    checked: true,
    disabled: false,
    content: (
      <div>
        <h2>Statystyki odwiedzin</h2>
        <div className="my2">
          Statystyki odwiedzin stanowią kluczowy element analizy popularności i
          skuteczności strony internetowej. Poprzez zbieranie danych na temat
          liczby odwiedzin, źródeł ruchu oraz zachowań użytkowników, można
          uzyskać cenne informacje wspierające procesy marketingowe i
          optymalizację treści.
        </div>
        <div className="my2">
          Współczesne narzędzia do analizy statystyk odwiedzin oferują
          zaawansowane funkcje, umożliwiające monitorowanie aktywności na
          stronie w czasie rzeczywistym. Dzięki nim webmasterzy i marketerzy
          mogą śledzić trendy, identyfikować popularne treści oraz oceniać
          efektywność kampanii reklamowych.
        </div>
        <div className="my2">
          Podstawowe wskaźniki statystyk odwiedzin obejmują liczbę sesji,
          unikalnych użytkowników, czas spędzony na stronie, współczynnik
          odrzutu i najczęściej odwiedzane strony. Te informacje pomagają
          zrozumieć, które elementy strony przyciągają uwagę odwiedzających, a
          które mogą wymagać poprawy.
        </div>
        <div className="my2">
          Analiza źródeł ruchu pozwala zidentyfikować, skąd pochodzą
          użytkownicy, czyli czy są to odwiedzający z organicznych wyników
          wyszukiwania, kampanii reklamowych, mediów społecznościowych czy
          innych kanałów. To kluczowe, aby dostosować strategię marketingową do
          najbardziej efektywnych źródeł.
        </div>
        <div className="my2">
          Ponadto, statystyki odwiedzin są niezbędne do mierzenia skuteczności
          działań marketingowych. Dzięki analizie konwersji można śledzić, ile
          użytkowników podejmuje pożądane działania, takie jak zakup produktu,
          rejestracja czy pobranie pliku.
        </div>
        <div className="my2">
          Wprowadzanie ciągłych usprawnień opartych na analizie statystyk
          odwiedzin to kluczowy element strategii online. Dlatego ważne jest,
          aby regularnie monitorować i interpretować zebrane dane, dostosowując
          działania do zmieniających się potrzeb i oczekiwań użytkowników.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "marketing",
    icon: "data_usage",
    checked: true,
    disabled: false,
    content: (
      <div>
        <h2>Marketing</h2>
		<div className="my2">
        Marketing to dynamiczna dziedzina, która odgrywa kluczową rolę w
        dzisiejszym biznesowym środowisku. Jest to strategiczny zestaw działań
        mających na celu zrozumienie, przyciągnięcie i utrzymanie klientów. W
        dzisiejszym świecie, gdzie konkurencja jest zacięta, skuteczna strategia
        marketingowa jest niezbędna dla sukcesu przedsiębiorstwa.
        </div>
		<div className="my2">
        Podstawowym celem marketingu jest zaspokajanie potrzeb i oczekiwań
        klientów poprzez dostarczanie im wartościowych produktów lub usług.
        Proces ten obejmuje badania rynku, segmentację, określanie grup
        docelowych oraz opracowywanie skutecznych komunikatów reklamowych.
        Dzięki marketingowi firmy mogą budować świadomość marki i zdobywać
        lojalność klientów.
        </div>
		<div className="my2">
		W dzisiejszym świecie online, cyfrowy marketing zyskuje na
        znaczeniu. Kampanie reklamowe w mediach społecznościowych,
        pozycjonowanie w wyszukiwarkach (SEO), czy też e-mail marketing stały
        się nieodłącznymi elementami działań promocyjnych. Analityka danych jest
        kluczowym narzędziem, umożliwiającym monitorowanie skuteczności kampanii
        i dostosowywanie strategii do zmieniających się potrzeb rynku.
        </div>
		<div className="my2">
        Innowacyjność jest jednym z filarów skutecznego marketingu. Firmy, które
        potrafią zaskoczyć i dostarczyć unikalne, wartościowe doświadczenia
        klientom, często odnoszą sukces. Kreatywne podejście do kampanii
        reklamowych, tworzenie angażującej treści oraz korzystanie z
        nowoczesnych technologii to kluczowe elementy skutecznej strategii
        marketingowej.
        </div>
		<div className="my2">
        Warto podkreślić, że marketing to nie tylko narzędzie sprzedażowe, ale
        również sposób budowania relacji z klientami. Klient, który czuje się
        zrozumiany i doceniony, jest bardziej skłonny do lojalności i
        rekomendacji. Dlatego budowanie trwałych relacji opartych na wzajemnym
        zaufaniu to ważny aspekt współczesnego marketingu.
        </div>
		<div className="my2">
        Podsumowując, marketing to nie tylko narzędzie promocji, ale kompleksowy
        proces zarządzania wartością dla klienta. W dynamicznym środowisku
        biznesowym, skuteczna strategia marketingowa jest kluczowym elementem
        osiągnięcia sukcesu i utrzymania konkurencyjności na rynku.
      </div>
	  </div>
    ),
  },
];

export default tabsData;
