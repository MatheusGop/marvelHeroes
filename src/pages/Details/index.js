import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    useParams,
} from "react-router-dom";
import heroRepository from '../../services/heroRepository';

import formatDate from '../../utils/formatDate';

import './styles.css';

function Details() {

    const params = useParams();

    const [hero, setHero] = useState({});
    const [comics, setComics] = useState([])

    const getHeroDetails = async () => {
        const response = await heroRepository.getHeroById(params.id)
        setHero(response.data.data.results[0])
        const promise = Promise.all(response.data.data.results[0].comics?.items.map(async comic => {
            const heroesComics = await heroRepository.getHeroByIdComicsById(comic.resourceURI)
            return heroesComics.data.data.results[0]
        }))
        promise.then(data => {
            setComics(data)
        })
    }

    useEffect(() => {
        getHeroDetails()
    }, [])

    console.log(hero)

    return (
        <main className="conteudo-detalhes-heroi">
            <div className="container-heroi">
                <div className="sobre-heroi">
                    <div className="heroi">
                        <img className="heroi-img" src={hero.thumbnail?.path + '.' + hero.thumbnail?.extension} alt="" />
                    </div>
                    <div className="heroi-detalhes-pessoais">
                        <h4 className="heroi-detalhes-title">Name</h4>
                        <h4 className="heroi-detalhes-subtitle">{hero.name}</h4>
                    </div>
                    <div className="heroi-detalhes-pessoais">
                        <h4 className="heroi-detalhes-title">Description</h4>
                        <h4 className="heroi-detalhes-subtitle">{hero.description}</h4>
                    </div>
                    <div className="heroi-links">
                        {hero.urls?.map(heroUrls => {
                            return (
                                <div key={heroUrls.type} className="heroi-container-botao">
                                    <button className="heroi-botao-link">
                                        <h4 className="heroi-link">{heroUrls.type}</h4>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="detalhes-heroi">
                <div className="series-heroi">
                    {comics.map(comic => {
                        return (
                            <div className="comics" key={comic.id}>
                                <div className="comic-container-img">
                                    <img className="comic-img" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt="" />
                                </div>
                                <div className="comic-detail">
                                    <div className="main-details">
                                        <h3 className="comic-title">{comic.title}</h3>
                                        <div className="comic-details">
                                            <h4 className="comic-title">Price: ${comic.prices[0].price}</h4>
                                            <h4 className="comic-title">Format: {comic.format}</h4>
                                        </div>
                                        <div className="comic-details">
                                            <h4 className="comic-title">Pagecount: {comic.pageCount}</h4>
                                            <h4 className="comic-title">SaleDate: {formatDate(comic.dates[0].date)}</h4>
                                        </div>
                                    </div>
                                    <div className="comic-details">
                                        {comic.urls.map(comicUrl => {
                                            return (
                                                <div key={comicUrl.type}>
                                                    <button className="comic-detail-button">
                                                        <a className="comic-detail-link" href={comicUrl.url} target="_blank">{comicUrl.type}</a>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default Details;