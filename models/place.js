

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Tipe tiket harus diisi'],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date
  }
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const PlaceSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }, 
    placeType: String,
    description: String,
    location: String,
    flora: String,
    fauna: String,
    makanan: String,
    sumberAir: Boolean,
    habitant: String,
    author:  { 
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  }]
 
}, opts,
{ typeKey: '$type' }, { timestamps: true });
 


PlaceSchema.virtual('properties.location').get(function() {
  return `<span>${this.location}</span>`;
}) 

PlaceSchema.virtual('properties.popUpMarkup').get(function() {

  return `<strong><a href="/places/${this._id}">${this.title}</a></strong>
        <img class="img-fluid" src="${this.images[0].url}" alt="gambar place">  </img>
        <ul>
          <li>type: ${this.type} </li>
          <li>flora: ${this.flora} </li>
          <li>fauna: ${this.fauna} </li>
          <li>makanan: ${this.makanan} </li>
          <li>habitant: ${this.habitant} </li>
          <li id="air">sumber air: ${this.sumberAir} </li>
        </ul>
        
        
        
        `
})

const Ticket = mongoose.model("Ticket", ticketCategoriesSchema);


const Place = mongoose.model('Place', PlaceSchema);
export { Place, Ticket };


