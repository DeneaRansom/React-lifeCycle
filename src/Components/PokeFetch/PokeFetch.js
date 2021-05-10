import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10
    }
  }

  tick() {
    this.setState({
      time: this.state.time -1 
    }) 
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000)
  }

componentWillUnmount() {
  clearInterval(() => (this.componentDidMount))
}

  fetchPokemon() {

    if (this.state.time < 0 ) {
      this.componentWillUnmount()
    }
    this.setState({
      time: 10
    })
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

      this.componentDidMount()

  }

  timeUp() {
    if (this.state.time >= 0) {
      return this.state.time
    }
  }
  
  pokeShadow() {
    if (this.state.time > 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.timeUp()}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} {...this.pokeShadow() } src={this.state.pokeSprite} />
          <h1 className={'pokeName'} {...this.pokeShadow() } >{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;