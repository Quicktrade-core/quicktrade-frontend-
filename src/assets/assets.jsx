import bag from './bag.jpg'
import bag1 from './bag1.jpg'
import bag2 from './bag2.jpg'
import bag3 from './bag3.jpg'
import bag4 from './bag4.jpg'
import bag5 from './bag5.jpg'

import car from './car.jpg'
import car1 from './car1.jpg'
import car2 from './car2.jpg'
import car3 from './car3.jpg'
import car4 from './car4.jpg'
import car5 from './car5.jpg'

import clip from './clip.mp4'
import clip1 from './clip1.mp4'
import clip2 from './clip2.mp4'
import clip3 from './clip3.mp4'
import clip4 from './clip4.mp4'
import clip5 from './clip5.mp4'

import cloth from './cloth.jpg'
import cloth1 from './cloth1.jpg'
import cloth2 from './cloth2.jpg'
import cloth3 from './cloth3.jpg'
import cloth4 from './cloth4.jpg'
import cloth5 from './cloth5.jpg'

import glass from './glass.jpg'
import glass1 from './glass1.jpg'
import glass2 from './glass2.jpg'
import glass3 from './glass3.jpg'
import glass4 from './glass4.jpg'
import glass5 from './glass5.jpg'

import phone from './phone.jpg'
import phone1 from './phone1.jpg'
import phone2 from './phone2.jpg'
import phone3 from './phone3.jpg'
import phone4 from './phone4.jpg'
import phone5 from './phone5.jpg'

import shoe from './shoe.jpg'
import shoe1 from './shoe1.jpg'
import shoe2 from './shoe2.jpg'
import shoe3 from './shoe3.jpg'
import shoe4 from './shoe4.jpg'
import shoe5 from './shoe5.jpg'

import snack from './snack.jpg'
import snack1 from './snack1.jpg'
import snack2 from './snack2.jpg'
import snack3 from './snack3.jpg'
import snack4 from './snack4.jpg'
import snack5 from './snack5.jpg'

import watch from './watch.jpg'
import watch1 from './watch1.jpg'
import watch2 from './watch2.jpg'
import watch3 from './watch3.jpg'
import watch4 from './watch4.jpg'
import watch5 from './watch5.jpg'

import user1 from "./3.png"
import user2 from "./4.png"
import user3 from "./login.png"
import user4 from "./signup.png"
import user5 from "./order.png"
import user6 from "./sellerProfile.png"

import all from "/hero.jpg"
import seller from "./sellerProfile.png"

export const menu_list = [
    { _id: "1", menu_name: "All", menu_image: all },
    { _id: "2", menu_name: "Bags", menu_image: bag },
    { _id: "3", menu_name: "Cars", menu_image: car },
    { _id: "4", menu_name: "Cloths", menu_image: cloth },
    { _id: "5", menu_name: "Glasses", menu_image: glass },
    { _id: "6", menu_name: "Phones", menu_image: phone },
    { _id: "7", menu_name: "Shoes", menu_image: shoe },
    { _id: "8", menu_name: "Snacks", menu_image: snack },
    { _id: "9", menu_name: "Watches", menu_image: watch }
]

export const store_list = [
  { _id: 1, path: `/login`, name: `Danile's snacks`, image: snack },
  { _id: 2, path: `/login`, name: `Danile's cars`, image: car },
  { _id: 3, path: `/login`, name: `Danile's cloths`, image: cloth },
  { _id: 4, path: `/login`, name: `Danile's shoes`, image: shoe },
  { _id: 5, path: `/login`, name: `Danile's glasses`, image: glass }
]

export const video_list = [
    { _id: "1", video: clip, cover: bag, image: seller, name: `Danile Obi`, likes: 68, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `5`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `6`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `7`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `8`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `9`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `10`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `11`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `12`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `13`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` }
    ], save: 10, share: 20, caption: `A durable leather backpack with a spacious interior, ideal for work, school, and everyday use.` },
    { _id: "2", video: clip1, cover: bag1, image: seller, name: `Danile Obi`, likes: 89, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `5`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `6`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `7`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `8`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `9`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `10`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `11`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `12`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `13`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `14`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `15`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` }
    ], save: 12, share: 24, caption: `A roomy and lightweight duffel bag designed for weekend trips, travel, and gym sessions.` },
    { _id: "3", video: clip2, cover: bag2, image: seller, name: `Danile Obi`, likes: 43, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `5`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `6`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `7`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `8`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` }
    ], save: 6, share: 16, caption: `A compact crossbody bag with an adjustable strap, perfect for carrying everyday essentials.` },
    { _id: "4", video: clip3, cover: bag3, image: seller, name: `Danile Obi`, likes: 56, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `5`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `6`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` },
      { id: `7`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `8`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `9`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `10`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` }
    ], save: 8, share: 18, caption: `A padded laptop bag with multiple compartments for safely carrying your laptop, charger, and accessories.` },
    { _id: "5", video: clip4, cover: bag4, image: seller, name: `Danile Obi`, likes: 19, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` }
    ], save: 3, share: 12, caption: `A lightweight and reusable canvas tote bag suitable for shopping, work, and casual outings.` },
    { _id: "6", video: clip5, cover: bag5, image: seller, name: `Danile Obi`, likes: 29, liked: false, comments: [
      { id: `1`, image: user1, name: `Ngozi Eze`, time: `2h ago`, comment: `Is this available in black?` },
      { id: `2`, image: user2, name: `Chidinma Okafor`, time: `3d ago`, comment: `how much is this?` },
      { id: `3`, image: user3, name: `Aminu Sule`, time: `5d ago`, comment: `Where are you located?` },
      { id: `4`, image: user4, name: `Kelechi Obi`, time: `1w ago`, comment: `Still available?` },
      { id: `5`, image: user5, name: `Peter Ojo`, time: `1w ago`, comment: `How much?` },
      { id: `6`, image: user6, name: `Joy David`, time: `2w ago`, comment: `Do you have this in red color?` }
    ], save: 5, share: 14, caption: `A stylish compact shoulder bag designed to hold your phone, wallet, keys, and other small essentials.` }
]

export const product_list = [
    {
        _id: "1",
        name: "Leather Backpack",
        image: bag,
        price: 45000,
        description: "A durable leather backpack with a spacious interior, ideal for work, school, and everyday use.",
        category: "Bags"
    }, {
        _id: "2",
        name: "Travel Duffel Bag",
        image: bag1,
        price: 38000,
        description: "A roomy and lightweight duffel bag designed for weekend trips, travel, and gym sessions.",
        category: "Bags"
    }, {
        _id: "3",
        name: "Crossbody Bag",
        image: bag2,
        price: 22000,
        description: "A compact crossbody bag with an adjustable strap, perfect for carrying everyday essentials.",
        category: "Bags"
    }, {
        _id: "4",
        name: "Laptop Bag",
        image: bag3,
        price: 35000,
        description: "A padded laptop bag with multiple compartments for safely carrying your laptop, charger, and accessories.",
        category: "Bags"
    }, {
        _id: "5",
        name: "Canvas Tote Bag",
        image: bag4,
        price: 12000,
        description: "A lightweight and reusable canvas tote bag suitable for shopping, work, and casual outings.",
        category: "Bags"
    }, {
        _id: "6",
        name: "Mini Shoulder Bag",
        image: bag5,
        price: 18000,
        description: "A stylish compact shoulder bag designed to hold your phone, wallet, keys, and other small essentials.",
        category: "Bags"
    }, {
        _id: "7",
        name: "Toyota Camry",
        image: car,
        price: 18500000,
        description: "A comfortable and reliable midsize sedan offering a smooth ride and practical interior.",
        category: "Cars"
    }, {
        _id: "8",
        name: "Honda Accord",
        image: car1,
        price: 21000000,
        description: "A refined sedan with a spacious cabin, comfortable driving experience, and modern features.",
        category: "Cars"
    }, {
        _id: "9",
        name: "Mercedes-Benz C-Class",
        image: car2,
        price: 45000000,
        description: "A premium luxury sedan combining elegant styling, advanced technology, and refined performance.",
        category: "Cars"
    }, {
        _id: "10",
        name: "BMW 3 Series",
        image: car3,
        price: 48000000,
        description: "A sporty luxury sedan with responsive handling, premium interior materials, and modern technology.",
        category: "Cars"
    }, {
        _id: "11",
        name: "Lexus RX",
        image: car4,
        price: 65000000,
        description: "A premium SUV offering a comfortable interior, smooth performance, and versatile everyday practicality.",
        category: "Cars"
    }, {
        _id: "12",
        name: "Tesla Model 3",
        image: car5,
        price: 55000000,
        description: "A modern electric sedan featuring impressive range, minimalist design, and advanced driving technology.",
        category: "Cars"
    }, {
        _id: "13",
        name: "Classic T-Shirt",
        image: cloth,
        price: 8500,
        description: "A comfortable everyday cotton T-shirt with a simple design that pairs easily with different outfits.",
        category: "Cloths"
    }, {
        _id: "14",
        name: "Slim Fit Jeans",
        image: cloth1,
        price: 18000,
        description: "Modern slim-fit jeans made from durable denim with a comfortable fit for casual everyday wear.",
        category: "Cloths"
    }, {
        _id: "15",
        name: "Cotton Hoodie",
        image: cloth2,
        price: 22000,
        description: "A soft cotton-blend hoodie with a comfortable fit, kangaroo pocket, and adjustable hood.",
        category: "Cloths"
    }, {
        _id: "16",
        name: "Denim Jacket",
        image: cloth3,
        price: 28000,
        description: "A classic denim jacket designed to add a stylish casual layer to everyday outfits.",
        category: "Cloths"
    }, {
        _id: "17",
        name: "Casual Polo Shirt",
        image: cloth4,
        price: 14000,
        description: "A smart-casual polo shirt made from breathable fabric for comfortable everyday wear.",
        category: "Cloths"
    }, {
        _id: "18",
        name: "Linen Shirt",
        image: cloth5,
        price: 19000,
        description: "A lightweight linen shirt designed for a cool and relaxed feel in warm weather.",
        category: "Cloths"
    }, {
        _id: "19",
        name: "Classic Sunglasses",
        image: glass,
        price: 15000,
        description: "Simple everyday sunglasses with a timeless frame and comfortable fit.",
        category: "Glasses"
    }, {
        _id: "20",
        name: "Aviator Glasses",
        image: glass1,
        price: 18000,
        description: "Classic aviator-style sunglasses featuring a lightweight metal frame and stylish teardrop lenses.",
        category: "Glasses"
    }, {
        _id: "21",
        name: "Round Frame Glasses",
        image: glass2,
        price: 16000,
        description: "Stylish round-frame glasses with a lightweight construction suitable for everyday use.",
        category: "Glasses"
    }, {
        _id: "22",
        name: "Square Frame Glasses",
        image: glass3,
        price: 17000,
        description: "Modern square-frame glasses offering a clean and bold look for everyday wear.",
        category: "Glasses"
    }, {
        _id: "23",
        name: "Blue Light Glasses",
        image: glass4,
        price: 12500,
        description: "Computer glasses designed with blue-light filtering lenses for comfortable screen use.",
        category: "Glasses"
    }, {
        _id: "24",
        name: "Polarized Sunglasses",
        image: glass5,
        price: 24000,
        description: "Polarized sunglasses designed to reduce glare and provide comfortable vision in bright conditions.",
        category: "Glasses"
    }, {
        _id: "25",
        name: "iPhone 16 Pro",
        image: phone,
        price: 1450000,
        description: "A premium smartphone featuring a high-performance processor, advanced cameras, and a durable premium design.",
        category: "Phones"
    }, {
        _id: "26",
        name: "Samsung Galaxy S25",
        image: phone1,
        price: 1250000,
        description: "A flagship Android smartphone with a vibrant display, powerful performance, and versatile camera system.",
        category: "Phones"
    }, {
        _id: "27",
        name: "Google Pixel 9",
        image: phone2,
        price: 950000,
        description: "A premium smartphone known for its clean Android experience, computational photography, and smart features.",
        category: "Phones"
    }, {
        _id: "28",
        name: "OnePlus 13",
        image: phone3,
        price: 980000,
        description: "A high-performance smartphone with a fast display, powerful processor, and large battery.",
        category: "Phones"
    }, {
        _id: "29",
        name: "Xiaomi 15",
        image: phone4,
        price: 850000,
        description: "A feature-packed smartphone offering strong performance, a high-quality display, and capable cameras.",
        category: "Phones"
    }, {
        _id: "30",
        name: "Tecno Camon 30",
        image: phone5,
        price: 320000,
        description: "A stylish mid-range smartphone with a large display, capable cameras, and long-lasting battery.",
        category: "Phones"
    }, {
        _id: "31",
        name: "Running Sneakers",
        image: shoe,
        price: 32000,
        description: "Lightweight running shoes with cushioned soles designed for workouts, jogging, and everyday movement.",
        category: "Shoes"
    }, {
        _id: "32",
        name: "Leather Loafers",
        image: shoe1,
        price: 28000,
        description: "Classic leather loafers with a comfortable slip-on design suitable for smart-casual occasions.",
        category: "Shoes"
    }, {
        _id: "33",
        name: "Classic Boots",
        image: shoe2,
        price: 42000,
        description: "Durable ankle boots with a timeless design suitable for casual outfits and everyday wear.",
        category: "Shoes"
    }, {
        _id: "34",
        name: "Canvas Sneakers",
        image: shoe3,
        price: 20000,
        description: "Lightweight canvas sneakers with a simple casual design for everyday activities.",
        category: "Shoes"
    }, {
        _id: "35",
        name: "Formal Oxford Shoes",
        image: shoe4,
        price: 35000,
        description: "Elegant Oxford shoes featuring a classic design suitable for formal events and professional outfits.",
        category: "Shoes"
    }, {
        _id: "36",
        name: "Casual Slip-On Shoes",
        image: shoe5,
        price: 18000,
        description: "Comfortable slip-on shoes designed for easy everyday wear without the need for laces.",
        category: "Shoes"
    }, {
        _id: "37",
        name: "Potato Chips",
        image: snack,
        price: 1500,
        description: "Crispy golden potato chips lightly seasoned for a crunchy and satisfying snack.",
        category: "Snacks"
    }, {
        _id: "38",
        name: "Chocolate Bar",
        image: snack1,
        price: 2500,
        description: "A smooth and creamy chocolate bar made for a quick sweet treat.",
        category: "Snacks"
    }, {
        _id: "39",
        name: "Granola Bars",
        image: snack2,
        price: 3500,
        description: "Crunchy oat-based snack bars made with grains and ingredients for a convenient on-the-go snack.",
        category: "Snacks"
    }, {
        _id: "40",
        name: "Cheese Crackers",
        image: snack3,
        price: 1800,
        description: "Crunchy crackers with a savory cheese flavor, perfect for snacking throughout the day.",
        category: "Snacks"
    }, {
        _id: "41",
        name: "Popcorn",
        image: snack4,
        price: 1200,
        description: "Freshly popped crunchy popcorn with a lightly salted flavor, perfect for movie nights and casual snacking.",
        category: "Snacks"
    }, {
        _id: "42",
        name: "Peanut Cookies",
        image: snack5,
        price: 2000,
        description: "Crunchy cookies with a rich peanut flavor, packaged for convenient everyday snacking.",
        category: "Snacks"
    }, {
        _id: "43",
        name: "Classic Leather Watch",
        image: watch,
        price: 28000,
        description: "A timeless wristwatch with a genuine-style leather strap and minimalist dial for everyday wear.",
        category: "Watches"
    }, {
        _id: "44",
        name: "Stainless Steel Watch",
        image: watch1,
        price: 42000,
        description: "A stylish stainless-steel watch featuring a durable metal bracelet and classic dial.",
        category: "Watches"
    }, {
        _id: "45",
        name: "Digital Sports Watch",
        image: watch2,
        price: 22000,
        description: "A durable digital watch designed for active lifestyles with a clear display and sporty design.",
        category: "Watches"
    }, {
        _id: "46",
        name: "Luxury Chronograph",
        image: watch3,
        price: 85000,
        description: "A sophisticated chronograph watch featuring a detailed dial and premium-inspired finish.",
        category: "Watches"
    }, {
        _id: "47",
        name: "Minimalist Wristwatch",
        image: watch4,
        price: 25000,
        description: "A clean and modern wristwatch with a simple dial designed to complement everyday outfits.",
        category: "Watches"
    }, {
        _id: "48",
        name: "Smartwatch",
        image: watch5,
        price: 65000,
        description: "A modern smartwatch with fitness tracking, notifications, activity monitoring, and smartphone connectivity.",
        category: "Watches"
    }
]