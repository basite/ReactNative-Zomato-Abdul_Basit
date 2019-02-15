import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Card, CardItem, Left, Text, Body, Right, Content, Icon, Button, Item, Input, Spinner, Thumbnail } from 'native-base';
import axios from 'axios';

export default class App extends Component {
  state = {
    search: "",
    generatekey: "863053ba461572508e16ba328fbfe782",
    Restoran: "",
    isLoading: false
  }

  cariResto = () => {
    this.setState({
      isLoading: true
    });
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
    var config = {
      headers: { 'user-key': `${this.state.generatekey}` }
    };

    axios.get(url, config).then((x) => {
      if (x.data.restaurants.length > 0) {
        this.setState({
          Restoran: x.data.restaurants,
          isLoading: false
        });
      }

      else {
        this.setState({
          isLoading: false,
          Restoran: ""
        });
        alert("Maaf, kami tidak dapat menemukan makanan yang anda cari");
      }
    })
  }

  showResto() {
    return this.state.Restoran.map((val, i) => {
      return (
        <Card style={{ flex: 0, width: 350, alignSelf: "center", marginTop: 10 }} key={i}>
          <CardItem bordered>
            <Left>
              { }
              <Thumbnail style={{ maxWidth: 30, maxHeight: 30 }} square source={{ uri: val.restaurant.thumb ? val.restaurant.thumb : 'https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1506429243/skhqmbw3xxkfcuopf9yp.png' }} />
              <Body>
                <Text>{val.restaurant.name}</Text>
                <Text note>{val.restaurant.location.city}</Text>
              </Body>
            </Left>
            <Right>
              { }
              <Text>Rp {(parseInt(val.restaurant.average_cost_for_two) / 2).toLocaleString()}</Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Body>
              { }
              {val.restaurant.thumb ?
                <Image source={{ uri: val.restaurant.thumb }} style={{ height: 200, width: "100%", flex: 1 }} />
                :
                <Image source={require('./img/default.jpg')} style={{ height: 200, width: "100%", flex: 1 }} />
              }
            </Body>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Icon name="pin" />
              <Text>{val.restaurant.location.address}</Text>
            </Left>
          </CardItem>
        </Card>
      )
    });
  }
   
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari menu makanan.." onChangeText={(e) => {
              this.setState({
                search: e
              })
            }}></Input>
          </Item>
        </Header>

        <Button full onPress={this.cariResto}>
          <Text>LIHAT DAFTAR RESTO</Text>
        </Button>
        <Content style={{ backgroundColor: "blue", flexDirection: "column" }}>
          { }
          {this.state.isLoading ? <Spinner /> : this.state.Restoran ? this.showResto() : <Text></Text>}
        </Content>
      </Container>)
  }
}
