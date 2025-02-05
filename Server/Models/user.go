package model

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name" gorm:"not null; column:name;size:255"`
	Password string `json:"password" gorm:"not null; column:password;size:255"`
}
