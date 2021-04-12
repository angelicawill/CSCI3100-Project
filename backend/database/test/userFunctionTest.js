//handling db connections
const config = require("./config.json")
const mongoose = require("mongoose");
const {initDB,dropAll, deleteAllDoc} = require("./db_init/dbHandler");
const dbUri = config.dburiLocal;
//testing with chai
const chai = require('chai');
chai.use(require('chai-as-promised'));

const assert = require('chai').assert
const expect = require("chai").expect



//function to test
const user = require("../user")


describe("Testing get user names function",()=>{
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
        assert.equal(await user.getUserid({username:"Kurt75157"}),2)
        assert.equal(await user.getUserid({phonenumber:53042531}),2)
      })
      it ("should get back none with not exist user",async()=>{
        assert.equal(await user.getUserid({username:"Kurt751f57"}),null)
      })
      it ("should throw error with field not an unique identfier",async()=>{
        await expect(user.getUserid({role:"tutor"}) ).to.eventually.be.rejectedWith(Error);
      })
    }
   setofTest()
  })

  describe("testing getUserInfo()",()=>{
    const setofTest = async()=>{
      it ("should get a student with valid input",async()=>{
        const t1 = await user.getUserInfo({username:"Kurt75157"})
        assert.equal(t1["tutorid"],2)

        assert.equal((await user.getUserInfo({email:"Mohamed9021@gmail.com"}))["studentid"],4)
      })
      it ("should get nothing with not exist user",async()=>{

      })
    }
   setofTest()

  })

  describe("testing getUserBasicInfo()",()=>{
    const setofTest = async()=>{
      it ("should get with exist user",async()=>{
        assert.equal((await user.getUserBasicInfo({"username": "Mohamed85401"}))["userid"],4)
        assert.equal((await user.getUserBasicInfo({"phonenumber": 78203341}))["userid"],5)
        assert.equal((await user.getUserBasicInfo({"email": "Barack47721@gmail.com"}))["userid"],6)
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
      await user.setUserInfo(2,{phonenumber:12345678})
      assert.equal((await user.getUserBasicInfo({userid:2}))["phonenumber"],12345678)
    })
    it("should not change with invalid input",async()=>{
      await user.setUserInfo(2,{phonenumber:"fdsfsd"})
      assert.equal((await user.getUserBasicInfo({userid:2}))["phonenumber"],53042531)
    })
    it("should return false with invalid input",async()=>{
      assert.equal(await user.setUserInfo(2,{phonenumber:"fdsfsd"}),false)
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
