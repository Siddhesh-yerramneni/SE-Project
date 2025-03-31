package model

type Review struct {
	ID     uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID uint   `json:"user_id" gorm:"not null"`
	BookID uint   `json:"book_id" gorm:"not null"`
	Review string `json:"review" gorm:"not null; size:500"`
	Name   string `json:"name" gorm:"-"`
	User   *User  `json:"user" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
	Book   *Book  `json:"book" gorm:"foreignKey:BookID;constraint:OnDelete:CASCADE;"`
}
