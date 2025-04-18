package model

import "time"

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	AuthorID  uint      `json:"author_id" gorm:"not null"`                                      // FK to User
	Title     string    `json:"title" gorm:"not null;size:255"`                                 // Post title
	Content   string    `json:"content" gorm:"not null;type:text"`                              // Full content
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`                               // Timestamp
	Author    *User     `json:"author" gorm:"foreignKey:AuthorID;constraint:OnDelete:CASCADE;"` // Associated user
}
