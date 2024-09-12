var roleacess = [
  {
    role: "Procurement",
    routes: [
      //Procurement Management
      {
        layout: "purchaseorder",
      },
      {
        layout: "transferorder",
      },
      {
        layout: "productiontransfer",
      },
    ],
  },
];

exports.Validator = function (req, res, layout) {
  roleacess.forEach((key, item) => {
    var routes = key.routes;

    routes.forEach((value, index) => {
      // console.log(`${key.role} - ${value.layout}`);

      if (key.role == req.session.accesstype && value.layout == layout) {
        return res.render(`${layout}`, {
          positiontype: req.session.positiontype,
          accesstype: req.session.accesstype,
          username: req.session.username,
          fullname: req.session.fullname,
          employeeid: req.session.employeeid,
          branchid: req.session.branchid,
          usercode: req.session.usercode,
        });
      }
    });
  });

  res.redirect("/login");
};
