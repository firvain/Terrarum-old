<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(value, key) in items" :key="key" xs12 md6>
        <v-card color="secondary darken-2" class="white--text" hover raised>
          <v-layout pa-2>
            <v-flex xs7>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs5>
              <v-card-title primary-title>
                {{ value.message }}
              </v-card-title>
            </v-flex>
          </v-layout>

          <v-divider light></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          message: "Content 1"
        },
        {
          message: "Content 2"
        },
        {
          message: "Content 3"
        },
        {
          message: "Content 4"
        }
      ]
    };
  }
};
</script>
