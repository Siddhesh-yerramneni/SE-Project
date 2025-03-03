package model

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Username string `json:"username" gorm:"not null;size:255;unique"`
	Email    string `json:"email" gorm:"not null;size:255;unique"`
	Password string `json:"password" gorm:"not null;size:255"`
	Name     string `json:"name" gorm:"not null;size:255"`

}
