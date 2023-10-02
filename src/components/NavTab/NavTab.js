import React from "react"
import "./NavTab.css"
import { Link } from "react-scroll"

function NavTab() {
  return (
    <nav>
      <ul className="nav-tab">
        <Link to="project" smooth={true} duration={500} className="nav-tab__link">
          О проекте
        </Link>

        <Link to="techs" smooth={true} duration={700} className="nav-tab__link">
          Технологии
        </Link>

        <Link
          to="about-me"
          smooth={true}
          duration={900} className="nav-tab__link"
        >
          Студент
        </Link>
      </ul>
    </nav>
  )
}

export default NavTab
