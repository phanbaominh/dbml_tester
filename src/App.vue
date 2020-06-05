<template>
  <div id="app" class="project-view-container h-screen bg-white border-l border-solid">
    <Header/>
    <DiagramView
      class="hidden"
      :database="database"
    />
  </div>
</template>

<script>
import { Parser } from '@dbml/core';
import DiagramView from './components/DiagramView.vue';
import Header from './components/Header.vue';
import '@holistics/dbrender/dist/dbrender.css';

const input = `Table users [headerColor: #000000]{
  id integer [primary key, note: "hellooooooooo ooooooo oooooooooooooo oooooooooooooooooo oooooo oooooooooooo"]
  email varchar [pk, note: "hello how are you"]
  
  indexes { id }
}

Table bookings {
  id integer [primary key]
  user_id integer
  place_id integer
  start_date date
  end_date date
  price_per_night float
  num_nights integer [default: 100]

  indexes { id user_id place_id start_date }
}

// Places
Table places {
  id integer [primary key]
  host_id integer [not null, unique]
  address varchar
  city_id varchar
}

Table reviews {
  id integer [primary key]
  booking_id integer
  rating tinyint
  review_body text
}

// A host is also a user, but with additional info
Table hosts {
  id integer [primary key]
  user_id integer
}

Table cities {
  id integer [primary key]
  name e [default: "okoek"]
  country_id integer
  
  indexes { id name }
  
  note: "sasasa"
}

enum e {
  oke
  notoke
}

Table countries {
  id integer [primary key]
  country_code varchar
  name e [note: "hello"]
}

Ref: cities.country_id > countries.id
Ref: places.host_id > hosts.id
Ref: users.id < bookings.user_id
Ref: bookings.place_id > places.id
Ref: places.city_id > cities.id
Ref: hosts.user_id > users.id


Ref reviews_booking: "bookings"."id" < "reviews"."booking_id"

`;
export default {
  name: 'App',
  components: {
    DiagramView,
    Header,
  },
  data() {
    return ({
      database: Parser.parse(input, 'dbml').normalize(),
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
