const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.dbname, process.env.dbusername, process.env.dbpassword, {
  host: process.env.hostname,
  dialect: "mysql",
});

const GroupDataSchema = sequelize.define('groupData', {
  groupId: {type: Sequelize.UUID, unique: true},
  leader_name: {type: Sequelize.STRING(128)},
  leader_mobile: {type: Sequelize.DOUBLE},
  group_state: {type: Sequelize.STRING(64)},
  present_address: {type: Sequelize.STRING(512)},
  present_district: {type: Sequelize.STRING(512)},
  total_men: {type: Sequelize.INTEGER},
  total_women: {type: Sequelize.INTEGER},
  total_children: {type: Sequelize.INTEGER},
  total_person: {type: Sequelize.INTEGER},
  special_request: {type: Sequelize.STRING(512)},
  post_lockdown: {type: Sequelize.STRING(512)},
  present_landmark: {type: Sequelize.STRING(512)},
  location_gps: {type: Sequelize.STRING(512)},
  image_1: {type: Sequelize.STRING(512)},
  image_2: {type: Sequelize.STRING(512)},
  police_station: {type: Sequelize.STRING(512), allowNull: true},
  name_of_shelter: {type:Sequelize.STRING(1024)},
  no_of_migrants: {type:Sequelize.STRING(1024)},
  details_of_organization: {type:Sequelize.STRING(1024)},
  details_of_contractors: {type:Sequelize.STRING(1024)},
  details_of_police: {type:Sequelize.STRING(1024)},
});

const MigrantSchema = sequelize.define('migrantSchema',{
  migrantId: {type: Sequelize.UUID, unique: true},
  groupId: {
    type: Sequelize.INTEGER,
 
    references: {
      model: GroupDataSchema,
      key: 'id',
    }
  },
  type: {
    type: Sequelize.STRING, defaultValue: ""  },
  state: {
    type: Sequelize.STRING, defaultValue: "",
  },
  district: {
    type: Sequelize.STRING, defaultValue: "",
  },
  campName: {
    type: Sequelize.STRING, defaultValue: "",
  },
  runBy: {
    type: Sequelize.STRING, defaultValue: "",
  },
  facilities: {
    type: Sequelize.STRING, defaultValue: "",
  },
  employerName: {
    type: Sequelize.STRING, defaultValue: "",
  },
  sector: {
    type: Sequelize.STRING, defaultValue: "",
  },
  locality: {
    type: Sequelize.STRING, defaultValue: "",
  },
  address: {
    type: Sequelize.STRING, defaultValue: "",
  },
  name: {
    type: Sequelize.STRING, defaultValue: "",
  },
  age: {
    type: Sequelize.STRING, defaultValue: "",
  },
  gender: {
    type: Sequelize.STRING, defaultValue: "",
  },
  occupation: {
    type: Sequelize.STRING, defaultValue: "",
  },
  mobile: {
    type: Sequelize.STRING, defaultValue: "",
  },
  lastAddress: {
    type: Sequelize.STRING, defaultValue: "",
  },
  nativeDistrict: {
    type: Sequelize.STRING, defaultValue: "",
  },
  nativeState: {
    type: Sequelize.STRING, defaultValue: "",
  },
  haveBank: {
    type: Sequelize.STRING, defaultValue: "",
  },
  haveJandhan: {
    type: Sequelize.STRING, defaultValue: "",
  },
  accNo: {
    type: Sequelize.STRING, defaultValue: "",
  },
  ifsc: {
    type: Sequelize.STRING, defaultValue: "",
  },
  ujjwala: {
    type: Sequelize.STRING, defaultValue: "",
  },
  aadhaar: {
    type: Sequelize.STRING, defaultValue: ""
  },
});

sequelize.sync();

module.exports = {MigrantSchema, GroupDataSchema};
