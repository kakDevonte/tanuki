class User {
  private _id: string = '0';
  private _name: string = 'Неизвестный игрок';
  private _username: string = 'no_username';
  private _score: number = 0;
  private _record: number = 0;
  private _try: number = 5;
  private _isWin: boolean = false;

  public setIsWin(value: boolean) {
    this._isWin = value;
  }

  public getIsWin(): boolean {
    return this._isWin;
  }

  public setID(id: string): string {
    this._id = id;
    return this._id;
  }

  public getID(): string {
    return this._id;
  }

  public setName(name: string): string {
    this._name = name;
    return this._name;
  }

  public setUsername(username: string): string {
    this._username = username;
    return this._username;
  }

  public getUsername(): string {
    return this._username;
  }

  public getScore(): number {
    return this._score;
  }

  public resetScore(): number {
    this._score = 0;
    return this._score;
  }

  public plusScore(score: number): number {
    this._score += score;
    if (this._score > this._record) this._record = this._score;
    return this._score;
  }

  public setRecord(record: number): number {
    this._record = record;
    return this._record;
  }

  public getRecord(): number {
    return this._record;
  }

  public setTry(value: number): void{
    this._try = value;
  }

  public getTry(): number{
    return this._try;
  }
}

export default new User();
