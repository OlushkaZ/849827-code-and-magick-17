'use strict';

var Cloud = {
  width: 420,
  height: 270,
  x: 100,
  y: 10
};
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var drawRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, text, x, y, font, color) {
  ctx.font = font || '16px PT Mono';
  ctx.fillStyle = color || '#000000';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  drawRect(ctx, Cloud.x + GAP, Cloud.y + GAP, Cloud.width, Cloud.height, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, Cloud.x, Cloud.y, Cloud.width, Cloud.height, '#fff');
  drawText(ctx, 'Ура вы победили!', Cloud.x + GAP, Cloud.y + GAP * 2 + FONT_GAP, '16px PT Mono');
  drawText(ctx, 'Список результатов:', Cloud.x + GAP, Cloud.y + GAP + (GAP + FONT_GAP) * 2);
  var maxTime = getMaxElement(times);
  var bottomOfBar = Cloud.y + GAP * 2 + (GAP + FONT_GAP) * 3 + BAR_HEIGHT;
  var colorCloud;
  var numberOfUsers = (names.length >= times.length) ? names.length : times.length;
  for (var i = 0; i < numberOfUsers; i++) {
    var currentX = Cloud.x + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var currentHeight = (BAR_HEIGHT * times[i]) / maxTime;
    drawText(ctx, Math.round(times[i]) || 'NoScore', currentX, bottomOfBar - currentHeight - GAP);
    drawText(ctx, names[i] || 'NoName', currentX, bottomOfBar + FONT_GAP);
    colorCloud = 'rgba(0, 0, 255,' + Math.random() + ')';
    if (names[i] === 'Вы') {
      colorCloud = 'rgba(255, 0, 0, 1)';
    }
    drawRect(ctx, currentX, bottomOfBar - currentHeight, BAR_WIDTH, currentHeight, colorCloud);
  }
};
