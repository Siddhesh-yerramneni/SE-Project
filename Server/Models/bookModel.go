package model

type Book struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Bookname    string `json:"bookname"`
	Author      string `json:"author"`
	Description string `json:"description"`
	BookImage   string `json:"bookImage"`
}
