package model

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Username string `json:"username" gorm:"not null; column:username;size:255;unique"`
	Email    string `json:"email" gorm:"not null; column:email;size:255;unique"`
	Password string `json:"password" gorm:"not null; column:password;size:255"`
	Name     string `json:"name" gorm:"not null; column:name;size:255"`
}
