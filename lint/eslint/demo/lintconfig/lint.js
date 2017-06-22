// 例子，处理 fs.watch 监听器
fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename)
    console.log(filename);
    // 输出: <Buffer ...>
});

// task
// all files
// watch and show warn change file