#!/bin/bash
pm2 $1 ecosystem.config.js --only LANQIN-API --env production 
