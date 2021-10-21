<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table(name="daneUzytkownika")
 * @ORM\Entity(repositoryClass="App\Repository\daneUzytkownikaRepository")
 */
class DaneUzytkownikaEntity
{
    /**
     * @var int
     *
     * @ORM\Column(name="Id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="Imie", type="string", length=255)
     */
    private $imie;

    /**
     * @var string
     *
     * @ORM\Column(name="Nazwisko", type="string", length=255)
     */
    private $nazwisko;

    /**
     * @var string
     *
     * @ORM\Column(name="NazwaUzytkownika", type="string", length=255)
     */
    private $nazwaUzytkownika;

    /**
     * @var string
     *
     * @ORM\Column(name="Email", type="string", length=255)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="Haslo", type="string", length=255)
     */
    private $haslo;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return DaneUzytkownikaEntity
     */
    public function setId(int $id): DaneUzytkownikaEntity
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getImie(): string
    {
        return $this->imie;
    }

    /**
     * @param string $imie
     * @return DaneUzytkownikaEntity
     */
    public function setImie(string $imie): DaneUzytkownikaEntity
    {
        $this->imie = $imie;
        return $this;
    }

    /**
     * @return string
     */
    public function getNazwisko(): string
    {
        return $this->nazwisko;
    }

    /**
     * @param string $nazwisko
     * @return DaneUzytkownikaEntity
     */
    public function setNazwisko(string $nazwisko): DaneUzytkownikaEntity
    {
        $this->nazwisko = $nazwisko;
        return $this;
    }

    /**
     * @return string
     */
    public function getNazwaUzytkownika(): string
    {
        return $this->nazwaUzytkownika;
    }

    /**
     * @param string $nazwaUzytkownika
     * @return DaneUzytkownikaEntity
     */
    public function setNazwaUzytkownika(string $nazwaUzytkownika): DaneUzytkownikaEntity
    {
        $this->nazwaUzytkownika = $nazwaUzytkownika;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return DaneUzytkownikaEntity
     */
    public function setEmail(string $email): DaneUzytkownikaEntity
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getHaslo(): string
    {
        return $this->haslo;
    }

    /**
     * @param string $haslo
     * @return DaneUzytkownikaEntity
     */
    public function setHaslo(string $haslo): DaneUzytkownikaEntity
    {
        $this->haslo = $haslo;
        return $this;
    }

    /**
     * @return string
     */
    public function getZdjecie(): string
    {
        return $this->zdjecie;
    }

    /**
     * @param string $zdjecie
     * @return DaneUzytkownikaEntity
     */
    public function setZdjecie(string $zdjecie): DaneUzytkownikaEntity
    {
        $this->zdjecie = $zdjecie;
        return $this;
    }

    /**
     * @var string
     *
     * @ORM\Column(name="Zdjecie", type="string", length=255)
     */
    private $zdjecie;





}