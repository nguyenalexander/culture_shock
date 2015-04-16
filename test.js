
var db = require('./models');
var async = require('async')


  if (req.isAuthenticated()){
    var totalLanguages = [];
    db.sequelize.query('SELECT * FROM languagesusers JOIN users ON users.id=languagesusers."userId" AND "userId"='+req.user.id+'')
      .spread(function(userData,created){
        async.each(userData,function(obj,callback){
          db.sequelize.query('SELECT * FROM languagesusers WHERE "languageId"='+obj.languageId+'')
            .spread(function(id,created){
              totalLanguages.concat(id);
              console.log(totalLanguages)
            })
        })
        // res.send(userData)
        // async.each(userData,function(data, callback){
        //   db.languagesusers.findAll({where:{languageId:data.languageId}})
        //     .then(function(e){
        //       console.log(e)
        //     })
        // })
      })
      console.log(totalLanguages)
    // db.user.find(
    //   {where:{id:req.user.id},
    //   include:[db.language]
    // }).then(function(user){
    //     async.each(user.languages,function(u,callback){
    //       db.languagesusers.findAll({where:{languageId:u.id}})
    //         .then(function(usersId){
    //           async.each(usersId,function(id,callback){
    //             db.user.findAll({where:{id:id.userId}}).then(function(specificUser){
    //               callback();
    //             })
    //           },function(err){
    //             if (err) throw err;
    //             res.render('home/index',{users:specificUser,languages:user.languages})
    //           })
    //         })
    //     })
    //   })
  }else{
    res.redirect('/')
  }
})















return;

db.user.find({where:{email:'trawgdor@hotmail.com'},
include: [db.language]})
    .then(function(user){
      // console.log(user.languages[0].languagesusers)
      db.languagesusers.findAll({where:{userId:user.id}})
        .then(function(ul){
          console.log('this is the callback of languagesusers',ul)
          async.each(req.body.language,(function(lang,callback){
            console.log('language id',lang)
            var wr_fluency = req.body["wr_fluency_"+lang]
            var sp_fluency = req.body["sp_fluency_"+lang]
            ul.update(
              {
                wr_fluency:wr_fluency,
                sp_fluency:sp_fluency
            },
              {where:
                {
                  userId:user.id,
                  languageId:lang
                }}).then(function(){
                  callback();
                })
          },function(err){
            res.send('it works!')
          }))
        })
        });

              // db.user.findAll().then(function(allUsers){
              //   console.log(allUsers)
              //   console.log('these are the users',usersId)
              //   res.render('home/index')


                  // res.send(specificUser)
                  // console.log(specificUser)

                  // res.render('home/index',{users:specificUser,languages:user.languages})


        // // console.log(user.languages[0].languagesusers)
        // db.languagesusers.findAll({where:{userId:user.id}})
        //   .then(function(ul){
            // console.log('this is the callback of languagesusers',ul)
            // console.log('this is ul.length',ul.length)


          // })

        // UPDATE languagesusers SET sp_fluencey='5',wr_fluency='4' WHERE userId='3' ANd languageId='3'
        // console.log(req.body.wr_fluency)

        //   console.log(req.body.sp_fluency[lang])
        // }))


        // console.log('data',parseInt(req.body.sp_fluency));
        //fluencies will be languageid:value
        //{english:10,french:6,...}
        // console.log('data writing',parseInt(req.body.wr_fluency));
        //req.body.language will be languageid
        //[3,4,1]
        // console.log('language data',parseInt(req.body.language));
          //use async, first parameter is the language id, then
          //function which takes in lang and callback, and lang will be the return of req.
          //
        async.each(req.body.language,function(lang,callback){
          req.body.wr_fluency[lang]
          db.language.update({wr_fluency:''},{where:{userId:,languageId:lang}}).then(function(){
             callback();
         })
        },function(err){
          //render page here
        })


      //   db.languagesusers.findAll({where:{userId:data.id}})
      //     .then(function(e){
      //       // console.log(e)
      //       var name = data.languages.name;
      //       console.log(name)
      //       e[0].updateAttributes
      //         ({sp_fluency:parseInt(req.body.sp_fluency),wr_fluency:parseInt(req.body.wr_fluency)})
      //       .then(function(x){
      //         res.send(x)
      //       })
      //     })
      // })






return;


router.post('/signup/2', function(req,res){
  db.user.find({where:{email:req.user.email},
  include: [db.language]})
      .then(function(data){
        // console.log(req.body.wr_fluency)
        async.each(req.body.language,(function(lang,callback){
          console.log('language id',lang)
          console.log('wr fluency value',req.body["wr_fluency_"+lang])
          console.log('speaking fluency value',req.body["sp_fluency_"+lang])
          db.update(
            {wr_fluency:req.body["wr_fluency_"+lang],sp_fluency:req.body["wr_fluency_"+lang]},{where:{userId:req.user.id,languageId:lang}})
        }))
// db.user.find({
//   where:{id:1},
//   include:[db.language]
// }).then(function(user){
//     console.log(user.get())
//     user.languages.forEach(function(l){
//       console.log(l.name)
//     })
// })



// return

// db.user.find(1).then(function(user){
//   user.getLanguages().then(function(languages){
//     console.log(user.get())
//     languages.forEach(function(l){
//       console.log(l.name)
//     })
//   })
// })

// return;

//       // user.languages.forEach(function(language){
//       //   language.map(function(lu){
//       //     res.send(lu)
//       //     return lu;
//       //   })
//       //   // res.render('auth/signup_2',{languages:language})
//       // })
//   // db.user.find({where:{email:req.user.email}})
//   // .then(function(singleUser){
//   //    db.user.findAll({include: [
//   //   {model: db.language}]}).then(function(users){
//   //     mappedUsers = users.map(function(user){
//   //       return {name: user.name, id:user.id, languages: user.languages.map(function(language){
//   //         return language.name
//   //       })}
//   //     })
//   //     console.log(mappedUsers)
//   //     res.render('auth/signup_2',{languages:mappedUsers[singleUser.id-1].languages})
//   //   })
//   // })

//   db.user.find({where:{email:'testtesttest@test.com'},
//   include: [
//     {model: db.language}]})
//       .then(function(data){
//         db.languagesusers.findAll({where:{userId:data.id}})
//           .then(function(e){
//             e.forEach(function(obj){
//               db.languagesusers.create({where:{userId:obj.userId,languageId:obj.languageId,sp_fluency: 5, wr_fluency: 5}})
//               // console.log('this is the object **********',obj)
//             })
//             console.log(e)
//             // console.log(e)
//             // e.sp_fluency = 5;
//             // e.wr_fluency = 5;

//             // console.log(e.sp_fluency)
//             // console.log(e.wr_fluency)
//             // e.save().then(function(x){
//             //   console.log(x)
//             //   res.send(x)
//             // })

//             // db.languagesusers.create({sp_fluency:parseInt(req.body.sp_fluency),wr_fluency:parseInt(req.body.wr_fluency)})
//             // .then(function(x){
//             //   res.send(x)
//             // })
// //           // })
// //       })
// // })


// // db.languagesusers.findAll({include:[
// //   {model: db.user},{model:db.language}
// //   ]}).then(function(e){
// //     console.log(e)
// //   })




// // db.user.find({where:{email:'testtesttest@test.com'},
// //   include: [
// //     {model: db.language}]})
// //       .then(function(data){
// //         db.languagesusers.findAll({where:{userId:data.id}})
// //           .then(function(e){
// //             console.log(e)
// //           })
// //       })
