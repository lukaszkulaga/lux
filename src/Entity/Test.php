<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table(name="[dbo].[Test]")
 * @ORM\Entity(repositoryClass="App\Repository\TestRepository")
 */
class Test
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
     **
     * @ORM\Column(name="Imie", type="string", length=255)
     */
    private $imie;

    /**
     * @var string
     *
     * @ORM\Column(name="[User]", type="string", length=255)
     */
    private $user;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataOstZmiany", type="datetime")
     */
    private $dataOstZmiany;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Test
     */
    public function setId(int $id): Test
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
     * @return Test
     */
    public function setImie(string $imie): Test
    {
        $this->imie = $imie;
        return $this;
    }

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @param string $user
     * @return Test
     */
    public function setUser(string $user): Test
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDataOstZmiany(): \DateTime
    {
        return $this->dataOstZmiany;
    }

    /**
     * @param \DateTime $dataOstZmiany
     * @return Test
     */
    public function setDataOstZmiany(\DateTime $dataOstZmiany): Test
    {
        $this->dataOstZmiany = $dataOstZmiany;
        return $this;
    }




}