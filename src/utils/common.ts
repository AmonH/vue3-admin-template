//检测数据类型
export function getType(obj: any): string {
  const classtype: any = {};
  const types = [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error',
    'Symbol',
    'Set',
    'Map'
  ];

  types.forEach((item) => {
    classtype[`[object${item}]`] = item.toLowerCase();
  });

  if (obj == null) {
    // 解决IE6下null和undefined会被Object.prototype.toString识别成[object Object]
    return obj + '';
  }

  //当typeof判断出类型为object|functin时调用Object.prototype.toString.call方法
  return typeof obj === 'object' || typeof obj === 'function'
    ? classtype[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
}
