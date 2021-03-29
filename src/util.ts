import Two from 'two.js';

export function createGrid(d: number) {
    var dimensions = d || 50;
    var two = new Two({
        type: Two.Types.canvas,
        width: dimensions,
        height: dimensions
    });

    var r = dimensions / 10;
    var center = dimensions / 2;

    var a = two.makeLine(center - r, center, center + r, center);
    var b = two.makeLine(center, center - r, center, center + r);

    a.stroke = b.stroke = '#222';
    a.linewidth = b.linewidth = 0.25;

    two.update();

    var style = document.body.style;
    style.backgroundImage = 'url(' + two.renderer.domElement.toDataURL() + ')';
    style.backgroundRepeat = 'repeat';
    style.backgroundPosition = "left 10px top 0px"
    style.backgroundSize = dimensions + 'px ' + dimensions + 'px';
}