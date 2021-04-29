//handling db connections
const config = require("./config.json")
const mongoose = require("mongoose");
const {initDB,dropAll, deleteAllDoc} = require("./db_init/dbHandler");
const dbUri = config.dburiLocal;
//testing with chai
const chai = require('chai');
chai.use(require('chai-as-promised'))
const assert = require('chai').assert
const expect = require("chai").expect


const fakeData = require("./test_data/fakeuser_new.json")
//function to test
const user = require("../user")
const {getStudentData,getTutorData} = require("../userGetter")
//gloaal testing variables
const firstUser = fakeData.table[0]
const firstStudentIndex = 0
const firstTutorIndex = 2
const firstStudent = fakeData.table[firstStudentIndex]
const firstTutor = fakeData.table[firstTutorIndex]


describe("Testing functions in user.js",()=>{

  before("connnect to db and add test data ",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
    //insert document here
    await initDB(30)

  })
  after("remove all documents",async ()=>{
    await deleteAllDoc()
    mongoose.disconnect()
  })




  describe("testing getUserid()", ()=>{
    

    const setofTest = async()=>{
      it ("should get back id with valid input",async()=>{
        assert.equal(await user.getUserid({username:firstUser.username}),1)
        assert.equal(await user.getUserid({phonenumber:firstUser.phonenumber}),1)
      })
      it ("should get back none with not exist user",async()=>{
        assert.equal(await user.getUserid({username:"fdsfsd"}),null)
      })
      it ("should throw error with field not an unique identfier",async()=>{
        await expect(user.getUserid({role:"tutor"}) ).to.eventually.be.rejectedWith(Error);
      })
    }
   setofTest()
  })

  describe("testing getUserInfo()",()=>{
    const setofTest = async()=>{
      it ("should get a student/tutor with valid input",async()=>{
        //student
        const t1 = await user.getUserInfo({username:firstStudent.username})
        assert.equal(t1["studentid"],firstStudentIndex + 1)

        //tutor
        assert.equal((await user.getUserInfo({email:firstTutor.email}))["tutorid"],firstTutorIndex + 1)
      })
      it ("should get nothing with not exist user",async()=>{

      })
    }
   setofTest()

  })

  describe("testing getUserBasicInfo()",()=>{
    const setofTest = async()=>{
      it ("should get with exist user",async()=>{
        assert.equal((await user.getUserBasicInfo({"username": firstUser.username}))["userid"],1)
        assert.equal((await user.getUserBasicInfo({"phonenumber": firstUser.phonenumber}))["userid"],1)
        assert.equal((await user.getUserBasicInfo({"email": firstUser.email}))["userid"],1)
      })
      it ("should get nothing with not exist user",async()=>{
        assert.equal((await user.getUserBasicInfo({"username": "Noexistname1"})),null)
        assert.equal((await user.getUserBasicInfo({"phonenumber": 0})),null)
        assert.equal((await user.getUserBasicInfo({"email": "notexistmail@gmail.com"})),null)
      })
      it ("should throw error with wrong parameter",async()=>{
        await expect(user.getUserid({role:"tutor"}) ).to.eventually.be.rejectedWith(Error);
        await expect(user.getUserid({"password": "abcdE12345"}) ).to.eventually.be.rejectedWith(Error);
      })
    }
   setofTest()

  })

  describe("Testing isVerified()",()=>{
    it("should return true for verified user",async()=>{
      await user.setVerified({userid:3})
      assert.equal(await user.isVerified({userid:3}),true)
    })
    it("should return false fo not verified user",async()=>{
      //should not use 3 again as the collection user is not rewritten
      assert.equal(await user.isVerified({userid:13}),false)
    })
    it("should return throw error for not found user",async()=>{
      await expect(user.isVerified({userid:300})).to.eventually.be.rejectedWith(Error);
    })
  })

})

describe("Testing altering user collections",()=>{
  before("connnect to db and add test data ",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  
    
  })
  after("remove all documents",async ()=>{
    await deleteAllDoc()
    mongoose.disconnect()
  })

  beforeEach("insert new set of test data",async ()=>{
    //insert document here
    await initDB(30)
  })

  afterEach("remove all documents",async ()=>{
  await deleteAllDoc()
  })

  describe("test setUserInfo()",async()=>{
    it("should change with valid input",async()=>{
      await user.setUserInfo(1,{phonenumber:12345678})
      assert.equal((await user.getUserBasicInfo({userid:1}))["phonenumber"],12345678)
    })
    it("should not change with invalid input",async()=>{
      await user.setUserInfo(1,{phonenumber:"fdsfsd"})
      assert.equal((await user.getUserBasicInfo({userid:1}))["phonenumber"],firstUser.phonenumber)
    })
    it("should return false with invalid input",async()=>{
      assert.equal(await user.setUserInfo(1,{phonenumber:"fdsfsd"}),false)
    })
    it("should raise error if not existuser",async()=>{
      assert.equal(await user.setUserInfo(200,{phonenumber:12345678}),false)
      //await user.setUserInfo(200,{phonenumber:12345678})
    })
  })

  describe("test setVerified()",()=>{
    it("should be verfied with valid input",async()=>{
      await user.setVerified({userid:2})
      assert.equal((await user.getUserBasicInfo({userid:2}))["isVerified"],true)
    })
  })

})
