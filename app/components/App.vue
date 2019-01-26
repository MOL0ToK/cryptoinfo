<template>
    <Page>
      <ActionBar>
        <StackLayout orientation="horizontal">
          <Label text="CryptoInfo" fontSize="24" verticalAlignment="center" width="90%"/>
          <Button text="?" class="button-help" @tap="helpClick" />
        </StackLayout>
      </ActionBar>

      <GridLayout columns="*" rows="*">
        <ActivityIndicator v-show="busyState" :busy="busyState"></ActivityIndicator>

        <ListView
          for="(coin, index) in coins"
          rowHeight="50"
          @itemTap="onItemTap"
        >
          <v-template class="coin-items">
            <StackLayout orientation="horizontal">
              <Image :src="'https://cryptocompare.com' + coin.CoinInfo.ImageUrl" stretch="aspectFit" width="20%"/>
              <Label :text="coin.CoinInfo.FullName" class="coin-name" width="50%"/>
              <Label :text="coin.DISPLAY.USD.PRICE" :class="'coin-price ' + coinsTrend[index]" width="30%"/>
            </StackLayout>
          </v-template>
        </ListView>

      </GridLayout>
    </Page>
</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        coins: [],
        coinsTrend: [],
        busyState: true
      }
    },
    methods: {
      getCoins: function () {
        axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD&api_key=' + this.$apikey)
          .then(res => {

            this.busyState = false

            if (!!this.coins[0]) {
              res.data.Data.forEach((item, i, arr) => {
                if (item.RAW.USD.PRICE > this.coins[i].RAW.USD.PRICE) {
                  this.coinsTrend[i] = 'green'

                  return
                }
                if (item.RAW.USD.PRICE < this.coins[i].RAW.USD.PRICE) {
                  this.coinsTrend[i] = 'red'

                  return
                }
              })
            }

            this.coins = res.data.Data
          })
          .catch(err => {
            // console.log(err)
          })
      },
      onItemTap: function (event) {
        this.$goto('coin', {
          props: {
            coinFullName: event.item.CoinInfo.FullName,
            coinName: event.item.CoinInfo.Name
          }
        })
      },
      helpClick: function () {
        alert({
          title: "App Info",
          message: "Version 0.0.1\n\nApplication developers:\n\nIvan Tyunin\nVitaly Shcherbakov\nDanil Zamerec",
          okButtonText: "Close"
        }).then(() => {
          // console.log("Alert dialog closed");
        });
      }

    },
    mounted: function () {
      this.getCoins()
      setInterval(() => {
        this.getCoins()
      }, 5000)
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    ActivityIndicator {
      vertical-align: center;
      text-align: center;
    }

    .coin-name {
      vertical-align: center;
      font-size: 16;
    }

    .coin-price {
      vertical-align: center;
      font-size: 16;
      text-align: center;
    }

    .button-help {
      background-color: #53ba82;
      color: #ffffff;
    }

    .red {
      color: red;
    }

    .green {
      color: green;
    }
</style>
