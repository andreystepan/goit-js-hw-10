export default function fetchCounties(name) {
    
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`).then((res) => {
        if (res.status === 200) {
            return res.json()
        }
        else {
            console.log("Error")
        }
    
    })
}

