class User {
  constructor(id, firstName, lastName, dateOfBirth, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
  }
}

module.exports = User;