

CREATE TABLE [dbo].[slownikPodmiot](
    [IdPodmiot] [int] IDENTITY(1,1) NOT NULL,
    [Opis] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdPodmiot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

    insert into [slownikPodmiot](Opis) values ('Wspólnota')
    insert into [slownikPodmiot](Opis) values ('Spółdzielnia')
    insert into [slownikPodmiot](Opis) values ('Zarządca')
    insert into [slownikPodmiot](Opis) values ('Inne')