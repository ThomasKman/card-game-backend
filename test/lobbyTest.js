const express = require('express');
const app = express();
var assert = require('assert');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const Lobby = require('../Lobby/lobby');

// generate new Lobby
const lobby = new Lobby(io);

describe('Lobby', function () {
  //   //addRoom
  //   describe('addRoom(roomName,gamemode)', function () {
  //     it('should add a Room', function () {
  //       assert.equal(lobby.addRoom('roomName', 'gamemode').length, 1);
  //       assert.equal(lobby.getRooms()[0].name, 'roomname');
  //       assert.equal(lobby.getRooms()[0].gamemode, 'gamemode');
  //     });
  //   });
  //   // getRooms
  //   describe('getRooms()', function () {
  //     it('should return rooms', function () {
  //       assert.equal(lobby.getRooms().length, 1);
  //       assert.equal(lobby.getRooms()[0].name, 'roomname');
  //       assert.equal(lobby.getRooms()[0].gamemode, 'gamemode');
  //     });
  //   });
  //   //getRoom
  //   describe('getRoom(roomName)', function () {
  //     it('should return the right room', function () {
  //       lobby.addRoom('room Name2', 'gamemode');
  //       const room = lobby.getRoom('   room Name2    ');
  //       assert.equal(room.name, 'room_name2');
  //       assert.equal(room.gamemode, 'gamemode');
  //     });
  // });
});
