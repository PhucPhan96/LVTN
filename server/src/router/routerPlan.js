'use strict'
var PlanController = require('./../controllers/planController.js');

module.exports = (app) => {
    app.route('/checkPlanExist/:event')
        .get(PlanController.checkPlanExist);
    app.route('/getPlanDetail/:event')
        .get(PlanController.getPlanDetail);
    app.route('/addPlanDetail')
        .post(PlanController.addPlanDetail);
    app.route('/createPlan')
        .post(PlanController.createPlan);
}