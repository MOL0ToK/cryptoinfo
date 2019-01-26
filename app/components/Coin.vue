<template>
    <Page>
      <ActionBar>
        <StackLayout orientation="horizontal">
          <Label :text="coinFullName" fontSize="24" verticalAlignment="center" width="90%"/>
        </StackLayout>
      </ActionBar>

      <GridLayout columns="*" rows="*">
        <ActivityIndicator v-show="busyState" :busy="busyState"></ActivityIndicator>

        <StackLayout>

          <StackLayout orientation="horizontal">
            <Label text="Date" class="coin-header" width="33%"/>
            <Label text="Price ($)" class="coin-header" width="33%"/>
            <Label text="Volume ($)" class="coin-header" width="33%"/>
          </StackLayout>


          <ListView
            for="coin in coinInfo"
            rowHeight="40"
          >
            <v-template class="coin-items">
              <StackLayout orientation="horizontal">
                <Label :text="coin.date" class="coin-info" width="33%"/>
                <Label :text="coin.price" class="coin-info" width="33%"/>
                <Label :text="coin.volume" class="coin-info" width="33%"/>
              </StackLayout>
            </v-template>
          </ListView>

        </StackLayout>

      </GridLayout>
    </Page>
</template>

<script>

import axios from 'axios'
import moment from 'moment'

export default {
  props: {
    coinFullName: String,
    coinName: String
  },
  data() {
    return {
      coinInfo: [],
      busyState: true
    }
  },
  methods: {
    getCoinInfo: function () {
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + this.coinName + '&tsym=USD&limit=30&api_key=' + this.$apikey)
        .then(res => {

          this.busyState = false

          let reverseRes = res.data.Data.reverse()
          let info = []
          reverseRes.forEach((item, i, arr) => {
            const avrgPrice = ((item.low + item.high) / 2).toFixed(2)
            info[i] = {
              date: moment.unix(item.time).format('DD.MM.YYYY'),
              price: avrgPrice,
              volume: item.volumeto
            }
          })
          this.coinInfo = info
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted: function () {
    this.getCoinInfo()
  }

}
</script>

<style scoped>
  ActionBar {
      background-color: #53ba82;
      color: #ffffff;
  }

  ActivityIndicator {
    vertical-align: center;
    text-align: center;
  }

  .coin-info {
    font-size: 14;
    vertical-align: center;
    text-align: center;
  }

  .coin-header {
    font-size: 16;
    vertical-align: center;
    text-align: center;
  }
</style>
