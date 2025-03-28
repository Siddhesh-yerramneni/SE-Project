package model

type Book struct {
	ID          uint    `json:"id" gorm:"primaryKey"`
	Bookname    string  `json:"bookname" gorm:"not null; column:bookname;size:255;"`
	Author      string  `json:"author" gorm:"not null; column:author;size:255;"`
	Description string  `json:"description" gorm:"not null; column:description;size:255;"`
	Price       float32 `json:"price" gorm:"not null; column:price; size:255;"`
	Category    string  `json:"category" gorm:"not null; column:category; size:255;"`
}
