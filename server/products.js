'use strict'

const db = require('APP/db')
const Products = db.model('products')

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
  // The forbidden middleware will fail *all* requests to list users.
  // Remove it if you want to allow anyone to list all users on the site.
  //
  // If you want to only let admins list all the users, then you'll
  // have to add a role column to the users table to support
  // the concept of admin users.
  // forbidden('listing users is not allowed'),
  (req, res, next) =>
    Products.findAll()
      .then(products => res.json(products))
      .catch(next))
  .post('/',
  (req, res, next) =>
    Products.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/weapons',
  (req, res, next) => {
    Products.findAll(
      {
        where: {
          category: 'weapon'
        }
      })
      .then(found => res.json(found))
      .catch(next)
  })

  .get('/costumes',
  (req, res, next) => {
    Products.findAll(
      {
        where: {
          category: 'costume'
        }
      })
      .then(found => res.json(found))
      .catch(next)
  })

  .get('/:id',
  // mustBeLoggedIn,
  (req, res, next) =>
    Products.findById(req.params.id)
      .then(product => res.json(product))
      .catch(next))

  .put('/:id', (req, res, next) => {
    Products.find({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        found.update(req.body)
      })
      .then(found => res.send(found))
      .catch(next)

  })
  .delete('/:id', (req, res, next) => {
    Products.find({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (!found) {
          res.sendStatus(404)
        }
        return found;

      })
      .then((found) => { return found.destroy() })
      .then(res.sendStatus(204))
      .catch(next)
  })