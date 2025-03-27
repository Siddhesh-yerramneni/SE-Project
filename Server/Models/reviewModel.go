package model

type Review struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	UserID uint   `json:"user_id" gorm:"not null"`
	BookID uint   `json:"book_id" gorm:"not null"`
	Review string `json:"review" gorm:"not null; size:500"`

	// Foreign key relationships
	User User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
	Book Book `gorm:"foreignKey:BookID;constraint:OnDelete:CASCADE;"`
}
