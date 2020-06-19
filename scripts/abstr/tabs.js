class Tabs {
    constructor() {
        this.tabs = {};
        this.active = null;
    }

    add(tab) {
        this.tabs[tab.label] = tab;
        this.active = tab.label;
    }

    draw(x, y, d=state.scale, s=d*spacing) {
        push();

        if (this.active) this.tabs[this.active].draw(x, y+d, d, s);

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign(LEFT, TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            const hovering = mouseInRect(x-d/2+offset, y-(correctSize/2), x-d/2+offset+textWidth(keys[tab]), y);
            fill(this.active == keys[tab] ? state.colors.white : (hovering ? state.colors.lightgray : state.colors.gray));
            text(keys[tab], x-d/2+offset, y-d/2);
            offset += textWidth(keys[tab] + ' ');
        }

        pop();
    }

    handleDouble(x, y, d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDouble(x, y, d, s);
    }

    handleDrag(x, y, d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDrag(x, y, d, s);
    }

    handlePress(x, y, d=state.scale, s=d*spacing) {
        push();

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign(LEFT, TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            if (mouseInRect(x-d/2+offset, y-(correctSize/2), x-d/2+offset+textWidth(keys[tab]), y)) this.active = keys[tab];
            offset += textWidth(keys[tab] + ' ');
        }

        if (this.active) this.tabs[this.active].handlePress(x, y, d, s);

        pop();
    }

    updateAll() {
        for (let tab of Object.values(this.tabs)) tab.updateAll();
    }
}
