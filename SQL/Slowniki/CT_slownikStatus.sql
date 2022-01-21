

CREATE TABLE [dbo].[slownikStatus](
    [IdStatus] [int] IDENTITY(1,1) NOT NULL,
    [Opis] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

    insert into slownikStatus(Opis) values ('Nowe')
    insert into slownikStatus(Opis) values ('Przekazano')
    insert into slownikStatus(Opis) values ('Przyjęto')
    insert into slownikStatus(Opis) values ('Zrealizowano')
    insert into slownikStatus(Opis) values ('Częściowo Zrealizowano')
    insert into slownikStatus(Opis) values ('Odrzucono')