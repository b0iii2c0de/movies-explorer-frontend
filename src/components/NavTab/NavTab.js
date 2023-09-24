import React from "react"
import "./NavTab.css"
import { Link } from "react-scroll"

function NavTab() {
  return (
    <nav>
      <ul className="nav-tab">
        <li className="nav-tab__link">
          <Link to="project" smooth={true} duration={500}>
            О проекте
          </Link>
        </li>
        <li className="nav-tab__link">
          <Link to="techs" smooth={true} duration={700}>
            Технологии
          </Link>
        </li>
        <li className="nav-tab__link">
          <Link
            to="about-me"
            smooth={true}
            duration={900}
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab
