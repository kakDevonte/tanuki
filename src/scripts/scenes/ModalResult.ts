import Result from "../screens/Result";

class ModalResult extends Phaser.Scene {
    constructor() {
        super('ModalResult');
    }

    public create(): void {
        new Result(this);
    }
}

export default ModalResult;
