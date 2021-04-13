const enum CriteriaOperation {
  EQ = ':',
  GT = '>',
  LT = '<',
  NE = '!',
  LIKE = '~',
  WILDCARD = '*',
  NULL = 'null',
  NOT_NULL = 'notnull'
}

class SearchCriteria {
  private readonly firstOperand: string = '';
  public secondOperand = '';
  private readonly operation: CriteriaOperation;
  private readonly isOr: boolean = false;

  get getSecondOperand(): string {
    return this.secondOperand;
  }

  constructor(firstOperand: string, secondOperand: string, operation: CriteriaOperation, isOr = false) {
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.operation = operation;
    this.isOr = isOr;
  }

  public get chainOp(): string {
    return this.isOr ? 'OR' : 'AND';
  }

  public toString(): string {
    return ` ${this.chainOp} ${this.firstOperand}${this.operation}${this.secondOperand}`;
  }

}

export class CriteriaBuilder {
  public criteriaList: any[] = [];
  private isBuilderOr = false;
  private isCriteriaOr = true;
  private of = '';


  public static of(of: string): CriteriaBuilder {
    const builder = new CriteriaBuilder();
    builder.of = of;
    return builder;
  }

  public and(): CriteriaBuilder {
    this.isCriteriaOr = false;
    return this;
  }

  public or(): CriteriaBuilder {
    this.isCriteriaOr = true;
    return this;
  }

  public eq(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public gt(operand1: string, operand2: any): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.GT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public lt(operand1: string, operand2: any): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.LT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public ne(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.NE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public like(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.WILDCARD + operand2 + CriteriaOperation.WILDCARD,
      CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public startsWith(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.WILDCARD + operand2
      , CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public endsWith(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2 + CriteriaOperation.WILDCARD,
      CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public null(operand1: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.NULL, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public notNull(operand1: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.NOT_NULL, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public criteria(cb: (builder: CriteriaBuilder) => CriteriaBuilder): any {
    const builder = new CriteriaBuilder();
    builder.isBuilderOr = this.isCriteriaOr;
    this.criteriaList.push(cb(builder));
    return builder;
  }

  public toString(): string {
    return ` ${this.isBuilderOr ? 'OR' : 'AND'} ${this.build()}`;
  }

  public build(): string {
    return '( ' + this.criteriaList.map(criteria => criteria.toString()).join('')
      .replace(/^\s\w{2,3}\s/, '') + ' )';
  }

  public buildUrlEncoded(): string {
    if (this.of) {
      return `/${this.of}?q=${encodeURIComponent(this.build())}`;
    }
    return encodeURIComponent(this.build());
  }

}
