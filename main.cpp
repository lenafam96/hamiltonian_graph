#include <iostream>
#include <fstream>

using namespace std;

int** A;//ma tran lien ke.
int* B;//danh sach dinh.
int* C;//danh dau trang thai dinh.
int n;//so dinh cua do thi.
int demct = 0, demdd = 0;//dem so luong chu trinh va duong di hamilton.

void Docfile(fstream& ifs)
{
    ifs >> n;
    A = new int* [n];
    B = new int[n];
    C = new int[n];
    cout << "\n\t*Do thi G = (V,E) co ma tran ke tuong ung:\n\n";
    //nhap va in ma tran ke
    for (int i = 0; i < n; i++)
    {
        A[i] = new int[n];
        C[i] = 0;
        cout << "\t\t";
        for (int j = 0; j < n; j++)
        {
            ifs >> A[i][j];
            cout << A[i][j] << "   ";
        }
        cout << endl;
    }
    cout << "\n\n\n";
}

void Inchutrinh()
{
    cout << "\t- Do thi G co chu trinh Hamilton: ";
    for (int i = 0; i < n; i++)
        cout << B[i] + 1 << " -> ";
    cout << B[0] + 1 << endl;
    demct++;
}

void ChutrinhHamilton(int* B, int* C, int i)
{
    for (int j = 0; j < n; j++)
    {
        if (demct == 1)
            break;
        //xet dieu kien tu dinh i-1 den dinh j co duong di khong va dinh j da xet chua
        if (A[B[i - 1]][j] > 0 && C[j] == 0 && j != B[i - 1])
        {
            B[i] = j;
            C[j] = 1;
            if (i < n)
                ChutrinhHamilton(B, C, i + 1);
            else
                if (B[i] == B[0])
                    Inchutrinh();
            C[j] = 0;
        }
    }
}

void Induongdi()
{
    cout << "\t- Do thi G co duong di Hamilton: ";
    cout << B[0] + 1;
    for (int i = 1; i < n; i++)
        cout << " -> " << B[i] + 1;
    demdd++;
    cout << endl;
}

void DuongdiHamilton(int* B, int* C, int i)
{
    if (i == n)
        Induongdi();
    else
    {
        for (int j = 0; j < n; j++)
        {
            if (demdd == 1)
                break;
            if (A[B[i - 1]][j] > 0 && C[j] == 0 && j != B[0] && j != B[i - 1])
            {
                B[i] = j;
                C[j] = 1;
                DuongdiHamilton(B, C, i + 1);
                C[j] = 0;
            }
        }
    }
}

int main()
{
    fstream ifs("input3.txt", ios::in);
    int i;
    Docfile(ifs);
    for (i = 0; i < n; i++)
    {
        B[0] = i;
        ChutrinhHamilton(B, C, 1);
        if (demct == 0)
            DuongdiHamilton(B, C, 1);
        if (demct != 0 || demdd != 0)
            break;
    }
    if (demct != 0)
        cout << "\n\n\t=> Do thi G la do thi Hamilton!";
    else
        if (demdd != 0)
            cout << "\n\n\t=> Do thi G la do thi nua Hamilton!";
        else
        {
            cout << "\t- Do thi G khong co duong di Hamilton!\n";
            cout << "\n\n\t=> Do thi G khong phai la do thi Hamilton hay do thi nua Hamilton!";
        }
    cout << "\n\n\n";
    return 0;
}