import React from 'react';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="logo" />
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <h1>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</h1>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn/>
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}
export default Home;