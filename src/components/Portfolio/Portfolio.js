import React from "react";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://c0deb0iii.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://c0deb0iii.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/c0deb0iii/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
