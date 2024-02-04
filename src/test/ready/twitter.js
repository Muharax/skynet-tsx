import React from "react";
import { Link } from "react-router-dom";
import "./test.css";

import foto from "../img/logo.png";

const Test = ({}) => {
  return (
    <div className="flex">
      <div>
        <Link to="#" class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Button</span>
            </Link>
      </div>

      <div class="border w-full h-40 flex items-center justify-center">
          <Link to="#_" class="relative inline-block text-lg group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span class="relative">Button</span>
            </span>
            <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
          </Link>
        </div>


      <div className="tweet-container-main">
        <div className="tweet-container-left">
          <div className="profile-photo">
            <Link to="#">
              <div className="profile-photo-img">
                <img src={foto} />
              </div>
            </Link>
          </div>
        </div>
        <div className="tweet-container">
          <div className="tweet-sidebar flex">
            {/* Profil użytkownika */}
            <div className="w100">
              <Link to="">
                <div className="tweet-profile">
                  <div>
                    <strong>Michał Woźniak</strong>
                  </div>
                  <div>
                    <div>@Nick</div>
                  </div>
                  <div>-</div>
                  <div>9 min</div>
                </div>
              </Link>
            </div>

            <div>
              <div className="tweet-sidebar-options">
                <div title="Lubie to">❤️</div>
              </div>
            </div>
          </div>
          {/* Treść posta */}
          <div className="tweet-content">
            <div className="tweet-content-user">
              Tutaj będzie tweet użytkownika, który go wpisze id doda, będzie
              mogł zawierać maxymalnie 200 znaków, a ni jednego więcej.19219-200
            </div>
            <div className="tweet-content-user-img">
              <img src={foto}></img>
            </div>
          </div>
          {/* Przyciski */}
          <div className="tweet-buttons">
            <button>
                👍
                <span>
                    15
                </span>
            </button>
            <button>🔁<span>15</span></button>
            <button>💬<span>154</span></button>
            <button>📷</button>
            <button>🔗</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
