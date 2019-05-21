import Dexie from 'dexie'

// 新建数据库
const db = new Dexie("eosWallet");

/**
 * 新增表，或改动表使用version进行控制，不能直接修改
 * 参考：http://dexie.org/docs/Tutorial/Design
 */
// 这个类似建立表
db.version(1).stores({
  transaction: "++id, value",
});

db.open().catch(function (e) {
  console.error("Open failed: " + e.stack);
})

export default db