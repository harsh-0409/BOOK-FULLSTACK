package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book_table")
public class Book {
    @Id
    @Column(name = "book_id")
    private int id;

    @Column(name = "book_title", nullable = false, length = 100)
    private String title;

    @Column(name = "book_author", nullable = false, length = 60)
    private String author;

    @Column(name = "book_genre", nullable = false, length = 40)
    private String genre;

    @Column(name = "book_isbn", nullable = false, unique = true, length = 20)
    private String isbn;

    @Column(name = "book_price", nullable = false)
    private Double price;

    @Column(name = "book_publisher", nullable = false, length = 80)
    private String publisher;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", genre='" + genre + '\'' +
                ", isbn='" + isbn + '\'' +
                ", price=" + price +
                ", publisher='" + publisher + '\'' +
                '}';
    }
}
