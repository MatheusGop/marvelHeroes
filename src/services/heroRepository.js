import Repository from './repository'
import generateMD5 from '../utils/generateMd5'

const privateKey = 'colocar chave privada'
const publicKey = 'colocar chave publica'
const ts = 'gerar data em unix time';

const api = generateMD5(ts + privateKey + publicKey)

export default {
    getHeroes() {
        return Repository.get(`/characters?limit=100&offset=0&apikey=${publicKey}&hash=${api}&ts=${ts}`)
    },
    getHeroByName(search) {
        return Repository.get(`/characters?nameStartsWith=${search}&limit=100&offset=0&apikey=${publicKey}&hash=${api}&ts=${ts}`)
    },
    getHeroById(id) {
        return Repository.get(`/characters/${id}?apikey=${publicKey}&hash=${api}&ts=${ts}`)
    },
    getHeroByIdComicsById(url) {
        return Repository.get(`${url}?apikey=${publicKey}&hash=${api}&ts=${ts}`)
    }
}