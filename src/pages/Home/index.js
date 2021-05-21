import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Pagination from "react-js-pagination";
import logo from '../../assets/logo.png';
import './styles.css';
import heroRepository from '../../services/heroRepository';

function Home() {

    const [heroes, setHeroes] = useState([]);
    const [postsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true)
        const res = await heroRepository.getHeroes()
        const data = res.data.data.results;
        setHeroes(data)
        setLoading(false)
    }

    const searchHero = () => {
        if (search === '') {
            getData()
            return;
        }
        heroRepository.getHeroByName(search).then(res => {
            setHeroes(res.data.data.results)
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchHero()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const startIndex = (page - 1) * 5;
    const selectedUsers = heroes.slice(startIndex, startIndex + 5);

    const handleClick = event => {
        setPage(event)
    }

    return (
        <>
            <header id="menu">
                <nav id="navbar">
                    <ul>
                        <li>
                            <img className="logo" src={logo} alt="" />
                        </li>
                        <li>
                            <h4>Matheus Gomes Pires</h4>
                            <h5 className="nav-subtitle">Teste de front-end</h5>
                        </li>
                    </ul>
                </nav>
            </header>
            <main id="conteudo">
                <div className="heroes-search">
                    <h4 className="hero-search-title">Nome do personagem</h4>
                    <div className="heroes-input">
                        <input type="text" className="heroes-search-input" value={search} onKeyDown={handleKeyDown} onChange={e => setSearch(e.target.value)} />
                        <i className="fas fa-search search-button" onClick={() => { searchHero() }}></i>
                    </div>
                </div>
                <div className="tt">
                    <div className="heroes-list">
                        <div className="heroes-title">
                            <h4 className="title">Personagem</h4>
                            <h4 className="title-series">Séries</h4>
                            <h4 className="title-eventos">Eventos</h4>
                        </div>
                        {loading && selectedUsers.length === 0 ? <div>Carregando...</div> : selectedUsers.length === 0 ? <div>Nenhum resultado encontrado</div> : selectedUsers.map(hero => {
                            return (
                                <div onClick={() => { window.location.href = '/details/' + hero.id }} className="heroes" key={hero.id} >
                                    <div className="heroes-details">
                                        <div className="hero-title">
                                            <img className="hero-image" src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt="" />
                                            <h4 className="hero-name">{hero.name}</h4>
                                        </div>
                                    </div>
                                    <div className="heroes-details-series">
                                        <div className="detail">
                                            {hero.series.items.slice(0, 3).map(serie => {
                                                return (
                                                    <div key={serie.resourceURI}>
                                                        <h5 className="series-name">{serie.name}</h5>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="heroes-details-events">
                                        <div className="detail">
                                            {hero.events.items.slice(0, 3).map(event => {
                                                return (
                                                    <div key={event.resourceURI}>
                                                        <h5 className="event-name">{event.name}</h5>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{ marginLeft: 50 }}>
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={postsPerPage}
                                totalItemsCount={heroes.length}
                                pageRangeDisplayed={5}
                                onChange={handleClick}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;