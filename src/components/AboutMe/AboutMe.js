import React from "react"
import image from "../../images/aboutme.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студень</h2>
      <div className="about-me__container">
        <div className="about-me__description-block">
          <h3 className="about-me__name">c0de b0iii</h3>
          <h4 className="about-me__job">Фуллстэк-разработчик, 30 лет</h4>
          <p className="about-me__description">
            Я родился и живу в Москве, закончил факультет лингвистики МГУ. У
            меня есть несколько жён. Я люблю писать музыку, а ещё увлекаюсь
            репом. Недавно начал кодить. С 2015 года работал в компании «Заскамь бабку». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл в умат.
          </p>
          <a
            className="about-me__github"
            href="https://github.com/c0deb0iii"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={image} alt="Мое фото" className="about-me__image" />
      </div>
    </section>
  )
}

export default AboutMe
