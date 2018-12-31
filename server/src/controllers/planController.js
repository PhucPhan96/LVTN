'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Plan = require('./../models/plan.js');
const PlanDetail = require('./../models/plan_detail.js');
const jwt = require('jsonwebtoken');

var plan = {
    checkPlanExist : (req, res) => {
        Plan.findOne({'event' : req.params.event}, function(err, rs){
            if (err || !rs) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getPlanDetail : (req, res) => {
        Plan.findOne({'event' : req.params.event}, function(err, rs){
            
            PlanDetail.find({'plan' : rs._id}, function(err, result){
                if (err || !result) {
                    console.log(`Update error ${err}`);
                    res.json({ result: 0, msg: `${err}`, result: {} });
                } else
                    res.json({ result: 1, msg: result || {} });
            })
        })
    },

    addPlanDetail : (req, res) => {
        var newplan = req.body;
        PlanDetail.create(newplan, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    createPlan : (req, res) => {
        var newplan = req.body;
        Plan.create(newplan, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },
}

module.exports = plan;